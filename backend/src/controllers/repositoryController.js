const { cloneRepository } = require("../services/repositoryService");
const { scanRepository } = require("../services/scannerService");
const { readFiles } = require("../services/fileReaderService");
const { detectProject } = require("../services/projectDetectorService");

const { generateChunks } = require("../services/chunkGeneratorService");

const { buildRepositoryGraph } = require("../services/repositoryGraphService");

const { analyzeDependencies } = require("../services/dependencyAnalyzerService");
const { buildFunctionLookup } = require("../services/functionLookupService");

const { detectDeadCode } = require("../services/deadCodeService");

const {
    generateRepositoryMetrics
} = require("../services/repositoryMetricsService");

const {
    detectCircularDependencies
} = require("../services/circularDependencyService");

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


const analyzeRepository = async (req, res) => {

    const { repositoryUrl } = req.body;

    // Check if URL is provided
    if (!repositoryUrl) {
        return res.status(400).json({
            success: false,
            message: "Repository URL is required"
        });
    }

    // Validate GitHub URL
    if (!repositoryUrl.startsWith("https://github.com/")) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid GitHub repository URL"
        });
    }

    try {

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


        const repositorySummary =
    generateRepositorySummary(

        repositoryPath,

        fileContents,

        repositoryMetrics,

        entryPoint,

        deadCode,

        circularDependencies

    );


        const repositoryMetrics =
    generateRepositoryMetrics(

        fileContents,

        repositoryGraph,

        deadCode,

        circularDependencies

    );

        // Detect project information
        const project = detectProject(fileContents);

        console.log(JSON.stringify(repositoryGraph, null, 2));

        return res.status(200).json({

            success: true,

            message: "Repository analyzed successfully",

            repositoryPath,

            project,

            totalFiles: fileContents.length,


            // files: fileContents

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

            repositorySummary




        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });

    }



};

module.exports = {
    analyzeRepository
};