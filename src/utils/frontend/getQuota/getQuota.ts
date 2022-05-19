const getQuota = () => new Promise< number >( async ( resolve ) => {
  try {
    const estimate = await navigator.storage.estimate();
    resolve( typeof estimate.quota !== 'undefined' ? estimate.quota : 0 );
  } catch {
    resolve(0);
  }
});

export default getQuota;