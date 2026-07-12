import {
  ArrowLeft,
  GitBranch,
  LoaderCircle,
  Lock,
  Play,
  Star,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
  RepositoryService,
} from "../../services/repository.service";


interface RepositoryHeaderProps {

  repositoryId: string;

  repository: {

    name: string;

    owner: string;

    visibility: string;

    language: string;

    branch: string;

    stars: number;

    lastScan: string;

  };

}


export default function RepositoryHeader({

  repositoryId,

  repository,

}: RepositoryHeaderProps) {

  const navigate =
    useNavigate();


  const [
    isReanalyzing,
    setIsReanalyzing,
  ] = useState(false);


  /*
  |--------------------------------------------------------------------------
  | Reanalyze Repository
  |--------------------------------------------------------------------------
  */

  const handleReanalyze =
    async () => {

      if (
        !repositoryId ||
        isReanalyzing
      ) {

        return;

      }


      try {

        setIsReanalyzing(true);


        toast.loading(

          "Analyzing repository...",

          {
            id:
              "repository-reanalysis",
          },

        );


        await RepositoryService
          .reanalyzeRepository(
            repositoryId,
          );


        toast.success(

          "Repository analysis completed.",

          {
            id:
              "repository-reanalysis",
          },

        );


        /*
         * Reload the page so all newly generated
         * repository data is fetched again.
         */

        window.location.reload();


      } catch (error) {

        console.error(

          "Repository reanalysis failed:",

          error,

        );


        toast.error(

          "Repository reanalysis failed.",

          {
            id:
              "repository-reanalysis",
          },

        );


      } finally {

        setIsReanalyzing(false);

      }

    };


  return (

    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-8">

      <button

        onClick={() =>
          navigate(
            "/repositories",
          )
        }

        className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"

      >

        <ArrowLeft
          size={18}
        />

        Back to Repositories

      </button>


      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-start gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.05]">

            <FaGithub
              size={34}
            />

          </div>


          <div>

            <h1 className="text-4xl font-bold">

              {repository.name}

            </h1>


            <p className="mt-2 text-zinc-400">

              {repository.owner}
              {" / "}
              {repository.name}

            </p>


            <div className="mt-5 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm">

                <Lock
                  size={14}
                />

                {repository.visibility}

              </div>


              <div className="rounded-full border border-white/10 px-3 py-1 text-sm">

                {repository.language}

              </div>


              <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm">

                <GitBranch
                  size={14}
                />

                {repository.branch}

              </div>


              <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm">

                <Star
                  size={14}
                />

                {repository.stars}

              </div>


              <div className="rounded-full border border-white/10 px-3 py-1 text-sm text-zinc-400">

                Last Scan •
                {" "}
                {repository.lastScan}

              </div>

            </div>

          </div>

        </div>


        <button

          type="button"

          onClick={
            handleReanalyze
          }

          disabled={
            isReanalyzing
          }

          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 font-semibold transition hover:shadow-[0_0_35px_rgba(99,102,241,.35)] disabled:cursor-not-allowed disabled:opacity-60"

        >

          {isReanalyzing ? (

            <>

              <LoaderCircle

                size={18}

                className="animate-spin"

              />

              Analyzing...

            </>

          ) : (

            <>

              <Play
                size={18}
              />

              Analyze Again

            </>

          )}

        </button>

      </div>

    </div>

  );

}