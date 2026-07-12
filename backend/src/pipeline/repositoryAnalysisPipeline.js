const { cloneRepository } = require("../services/repositoryService");
const { scanRepository } = require("../services/scannerService");
const { readFiles } = require("../services/fileReaderService");
const { detectProject } = require("../services/projectDetectorService");
const {
    detectArchitecture
} = require(
    "../services/architectureDetectorService"
);
const { generateChunks } = require("../services/chunkGeneratorService");

const { buildRepositoryGraph } = require("../services/repositoryGraphService");

const { analyzeDependencies } = require("../services/dependencyAnalyzerService");
const { buildFunctionLookup } = require("../services/functionLookupService");
const {
    saveRepositoryFiles
} = require("../services/repositoryFileService");
const { detectDeadCode } = require("../services/deadCodeService");

const {
    generateRepositoryMetrics
} = require("../services/repositoryMetricsService");

const {
    generateRepositoryDiagram,
    generateFunctionDiagram,
    generateExecutionDiagram,
    generateArchitectureDiagram
} = require("../services/mermaidService");

const {
    detectCircularDependencies
} = require("../services/circularDependencyService");

const {
    generateSemanticChunks
} = require("../services/semanticChunkService");

const {

    generateEmbeddings

} = require("../ai/embeddingService");

const {
    saveRepository,
    updateRepository,
    findRepositoryByUrl
} = require("../services/repositoryStorageService");


const {
    buildExecutionTree
} = require("../services/flowBuilderService");

const {
    exportGraph
} = require("../services/graphExportService");



const {
    generateRepositorySummary
} = require("../services/repositorySummaryService");

const {
    generateExecutionFlow
} = require("../services/executionFlowService");

const {
    detectEntryPoint
} = require("../services/entryPointDetectorService");

const repositoryAnalysisPipeline = async (
    repositoryUrl,
    options = {}
) => {

    try {

        const {
            userId,
            forceReanalyze = false,
            existingRepositoryId
        } = options;


        if (!userId) {

            throw new Error(
                "User ID is required for repository analysis"
            );

        }

    const existingRepository =
    await findRepositoryByUrl(
        repositoryUrl,
        userId
    );

if (
    existingRepository &&
    !forceReanalyze
) {

    return {

        alreadyAnalyzed: true,

        repositoryId: existingRepository.id,

        projectName: existingRepository.projectName,

        message: "Repository already analyzed."

    };

}



        // Clone repository
        const repositoryPath = await cloneRepository(repositoryUrl);

        // Scan repository
        const files = await scanRepository(repositoryPath);

        // Read all files
        const fileContents = await readFiles(
            files,
            repositoryPath
        );

        const chunks = generateChunks(fileContents);

        const repositoryGraph = buildRepositoryGraph(fileContents);

        const graphJson =
            exportGraph(repositoryGraph);

        const entryPoint =
            detectEntryPoint(fileContents);

        const executionTree =
            buildExecutionTree(
                repositoryGraph,
                entryPoint // use detected entry point as start node
            );


        const repositoryDiagram =
            generateRepositoryDiagram(repositoryGraph);

        const functionDiagram =
            generateFunctionDiagram(repositoryGraph);

        const executionDiagram =
            generateExecutionDiagram(executionTree);

        const architectureDiagram =
            generateArchitectureDiagram(repositoryGraph);


        const circularDependencies =
            detectCircularDependencies(
                repositoryGraph
            );

        const executionFlow =
            generateExecutionFlow(repositoryGraph);

        //     const executionFlow =
        // generateExecutionFlow(repositoryGraph);    




        const functionLookup = buildFunctionLookup(fileContents);

        const dependencies = analyzeDependencies(
            fileContents,
            functionLookup
        );

        const deadCode = detectDeadCode(fileContents);

        const repositoryMetrics =
            generateRepositoryMetrics(

                fileContents,

                repositoryGraph,

                deadCode,

                circularDependencies

            );





        const repositorySummary =
            generateRepositorySummary(

                repositoryPath,

                fileContents,

                repositoryMetrics,

                entryPoint,

                deadCode,

                circularDependencies

            );
        const semanticChunks =
            generateSemanticChunks(

                fileContents,

                repositoryGraph,

                executionFlow,

                repositorySummary

            );



        console.log(
            "PIPELINE:",
            process.env.GEMINI_API_KEY
        );
        // const embeddedChunks =
        //     await generateEmbeddings(

        //         repository.id,

        //         semanticChunks

        //     );
        const project =
    detectProject(fileContents);

// const repository =
//     await saveRepository({

//         repositoryUrl,

//         project,

//         repositorySummary,

//         repositoryMetrics,

//         executionFlow,

//         repositoryGraph,

//         repositoryDiagram,

//         functionDiagram,

//         executionDiagram,

//         architectureDiagram

//     });
const architecture =
    detectArchitecture(

        project,

        fileContents,

        repositoryGraph

    );

let repository;

if (existingRepositoryId) {

    repository =
    await updateRepository(

        existingRepositoryId,

        userId,

        {

            repositoryUrl,

            project,

            architecture,

            repositorySummary,

            repositoryMetrics,

            executionFlow,

            repositoryGraph,

            repositoryDiagram,

            functionDiagram,

            executionDiagram,

            architectureDiagram

        }

    );

} else {

    repository =
    await saveRepository({

        userId,

        repositoryUrl,

        project,

        architecture,

        repositorySummary,

        repositoryMetrics,

        executionFlow,

        repositoryGraph,

        repositoryDiagram,

        functionDiagram,

        executionDiagram,

        architectureDiagram

    });

}
await saveRepositoryFiles(
    repository.id,
    fileContents
);

const embeddedChunks =
    await generateEmbeddings(

        repository.id,

        semanticChunks

    );



       

        console.log(
            "Pipeline API Key:",
            process.env.GEMINI_API_KEY
        );

        console.log(
            "========== FIRST CHUNK =========="
        );

        console.log(
            semanticChunks[0]
        );

        console.log(
            "================================="
        );


        // // Detect project information
        // const project = detectProject(fileContents);

        console.log(JSON.stringify(repositoryGraph, null, 2));

        return {

            repositoryId: repository.id,

            repositoryPath,

            project,

            totalFiles: fileContents.length,

            files: fileContents.filter(
                file => file.language === "JavaScript"
            ),

            chunks,

            repositoryGraph,

            graphJson,

            executionTree,

            dependencies,

            deadCode,

            circularDependencies,

            executionFlow,

            repositoryDiagram,

            functionDiagram,

            executionDiagram,

            architectureDiagram,

            repositoryMetrics,

            repositorySummary,

            semanticChunks,

            embeddedChunks

        };
    } catch (error) {

        console.error(error);

        throw error;

    }




};

module.exports = {
    repositoryAnalysisPipeline
};