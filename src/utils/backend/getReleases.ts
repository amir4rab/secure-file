import { GhReleases, GhRelease } from '@/types/ghReleases';
import { Octokit } from 'octokit';

const getReleases = async () => {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
  
    let latest: null | GhRelease = null;
    try {
      const latestRelease = await octokit.request('GET /repos/amir4rab/secure-file/releases/latest');
      latest = latestRelease.data as GhRelease;
    } catch {
      latest = null;
    }
    const releasesResponse = await octokit.request('GET /repos/amir4rab/secure-file/releases');
  
    if ( latest !== null ) {
      const filteredReleases = ( releasesResponse.data as GhReleases ).filter( release => release.id !== latest?.id );
      return ([
        latest,
        ...filteredReleases
      ] as GhReleases)
    } 
    return releasesResponse.data as GhReleases;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getReleases;