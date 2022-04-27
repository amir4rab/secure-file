import React from 'react'

export interface pageQuery {
  id?: string,
  secret?: string,
  initializer?: string
}
export type ExtractQueryResponse = 
  { error: 'falseQueries', id: null, secret: null, initializer: null } |
  { error: null, id: null, secret: null, initializer: boolean } |
  { error: null, id: string, secret: string, initializer: boolean };

const extractDataPageQueries = ( { id, secret, initializer }: pageQuery ): ExtractQueryResponse => {
  if ( initializer === undefined ) return ({
    error: 'falseQueries', id: null, secret: null, initializer: null
  });

  if ( initializer === 'true' ) return ({
    error: null, id: null, secret: null, initializer: true
  });

  if ( initializer === 'false' && typeof id === 'string' && typeof secret === 'string' ) return ({
    error: null, id, secret, initializer: false
  });

  return ({
    error: 'falseQueries', id: null, secret: null, initializer: null
  });
};

export default extractDataPageQueries