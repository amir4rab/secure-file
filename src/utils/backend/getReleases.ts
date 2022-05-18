import { ghReleases } from '@/types/ghReleases';
import { Octokit } from 'octokit';

const getReleases = async () => {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
  
    const obj = await octokit.request('GET /repos/amir4rab/secure-file/releases');
  
    return obj.data as ghReleases; 
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getReleases;