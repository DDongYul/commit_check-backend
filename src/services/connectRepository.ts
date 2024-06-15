import { pool } from "../utils/db";
import { Endpoints } from "@octokit/types";
import { octokit } from "../api/octokit";

// 수영 버전
async function getAllCommits(
  owner: string,
  repo: string, 
  since: string,
  until: string,
): Promise<Endpoints["GET /repos/{owner}/{repo}/commits"]["response"]["data"]> {
  const result = await octokit.repos.listCommits({
    owner,
    repo,
    since,
    until,
    per_page: 100,
  });
  console.log(`API response status: ${result.status}`);

  // commit message만 추출
  const commitlogs: any = result.data;
  commitlogs.forEach((items:any) => {
    console.log(items.commit.message);
  });
  return result.data;
}

console.log(getAllCommits("ssafy-11th-seoul10", "2day-1algo", "2024-06-13", "2024-06-15"));

// 병서 버전
async function listCommits() {
  const ghrepos = require("ghrepos"),
    authOptions = {
      user: process.env.REACT_APP_GITHUB_USER,
      token: process.env.REACT_APP_GITHUB_TOKEN,
    };

  return new Promise<void>((resolve, reject) => {
    ghrepos.listCommits(
      authOptions,
      "ssafy-11th-seoul10",
      "2day-1algo",
      (err: Error | null, refData: any[]) => {
        if (err) {
          reject(err);
          return;
        }

        refData.forEach((item) => {
          console.log(item.commit.message);
        });

        resolve();
      }
    );
  });
}

function test() {
  const str: string = "connectRepository";

  return str;
}

async function dbTest() {
  const [rows, fields] = await pool.query("SELECT 1");
  return rows;
}

export { test, dbTest, listCommits };