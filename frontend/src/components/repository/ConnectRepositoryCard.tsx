import {
  useState,
} from "react";

import {
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import AnalysisStepper from "./AnalysisStepper";
import GitProviderTabs from "./GitProviderTabs";
import RepositoryUrlInput from "./RepositoryUrlInput";

import {
  RepositoryService,
} from "../../services/repository.service";


export default function ConnectRepositoryCard() {

  const navigate =
    useNavigate();

  const [
    provider,
    setProvider,
  ] = useState("github");

  const [
    url,
    setUrl,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);


  const handleConnect =
    async () => {

      const repositoryUrl =
        url.trim();


      if (!repositoryUrl) {

        toast.error(
          "Please enter a repository URL.",
        );

        return;

      }


      try {

        setIsLoading(true);


        const response =
          await RepositoryService.analyze(
            repositoryUrl,
          );


        console.log(
          "Analysis response:",
          response.data,
        );


        const repositoryId =
          response.data.repositoryId;


        if (!repositoryId) {

          throw new Error(
            "Repository ID was not returned.",
          );

        }


        toast.success(
          response.data.alreadyAnalyzed
            ? "Repository already analyzed."
            : "Repository analyzed successfully.",
        );


        navigate(
          `/repositories/${repositoryId}`,
        );


      } catch (error) {

        console.error(
          "Repository analysis failed:",
          error,
        );


        toast.error(
          "Failed to analyze repository.",
        );


      } finally {

        setIsLoading(false);

      }

    };


  return (

    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8 shadow-[0_20px_50px_rgba(0,0,0,.35)]">

      <AnalysisStepper
        currentStep={0}
      />


      <h2 className="text-2xl font-bold">

        Connect Your Repository

      </h2>


      <p className="mt-2 text-zinc-400">

        Choose a source and securely connect your codebase.

      </p>


      <div className="mt-8">

        <GitProviderTabs
          value={provider}
          onChange={setProvider}
        />

      </div>


      <div className="mt-8">

        <RepositoryUrlInput
          value={url}
          onChange={setUrl}
        />

      </div>


      <button
        type="button"
        onClick={() => {
          void handleConnect();
        }}
        disabled={
          isLoading ||
          !url.trim()
        }
        className="mt-8 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >

        {isLoading ? (

          <>

            <LoaderCircle
              size={19}
              className="animate-spin"
            />

            Analyzing Repository...

          </>

        ) : (

          "Connect Repository"

        )}

      </button>


      <div className="mt-6 flex items-center gap-2 text-sm text-zinc-500">

        <ShieldCheck
          size={18}
          className="text-emerald-400"
        />

        Your code is securely processed and never stored without
        permission.

      </div>

    </div>

  );

}