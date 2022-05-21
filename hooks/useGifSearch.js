import { useEffect,useReducer } from 'react'
import searchAll  from 'utils/search-all'
import searchGifs from 'utils/search-gifs'
const TYPE = {
    FETCH_REQUEST:'FETCH_REQUEST' ,
    FETCH_SUCCESS:'FETCH_SUCCESS',
    FETCH_FAIL:'FETCH_FAIL',
    MORE_REQUEST:'MORE_REQUEST',
    MORE_SUCCESS:'MORE_SUCCESS',
    MORE_FAIL:'MORE_FAIL',
    SET_OFFSET:'SET_OFFSET',
    RESET_OFFSET:'RESET_OFFSET',
    CHANGE_KEYWORD_TO_SEARCH:'CHANGED_KEYWORD_TO_SEARCH'
}
const reducer = (state, action)=>{
    switch (action.type) {
        case TYPE.FETCH_REQUEST:
            return {...state, isSearching:true, error:'' }
        case TYPE.FETCH_SUCCESS:    
            return {...state, searchResults:action.payload, isSearching:false, error:'', offset:0}
        case TYPE.FETCH_FAIL:
            return {...state, isSearching:false, error:action.payload}
        case TYPE.MORE_REQUEST:
            return {...state, isSearchingMore: true , error:''}
        case TYPE.MORE_SUCCESS:
            return {...state, isSearchingMore: false, searchResults: state.searchResults.concat(...action.payload.results), offset:action.payload.offset}           
        case TYPE.MORE_FAIL:
            return { ...state, isSearchingMore:false, error:action.payload}    
        case TYPE.CHANGE_KEYWORD_TO_SEARCH:
            return {...state, keyToSearch:action.payload}
        default:
            return {...state}
    }

} 
const useGifSearch = (initConfig = {},init='') => {
    const config = {
        initOffset : 0,
        typeSearch : 'gifs',
        limit : 10,
        delay : 1000,
        ...initConfig
    }
    const[{
        offset,
        keyToSearch,
        isSearching,
        isSearchingMore,
        searchResults    
    },dispatch] = useReducer(reducer,{
        offset:config.initOffset,
        keyToSearch:init,
        isSearching:false,
        isSearchingMore:false,
        searchResults:[]  
    })
    useEffect(()=>{
        const searcFunction = ()=>{
            if(keyToSearch ===''){
                dispatch({type:TYPE.FETCH_REQUEST})
                searchAll().then((res)=>{
                    dispatch({type:TYPE.FETCH_SUCCESS, payload:res})    
                }).catch((err)=>{
                    console.error(err)
                    dispatch({type: TYPE.FETCH_FAIL, payload:err})
                })
            }else{
                dispatch({type:TYPE.FETCH_REQUEST})
                const search = encodeURI(keyToSearch)
                searchGifs({search:keyToSearch, offset, limit:config.limit }).then(res=>{    
                    dispatch({type:TYPE.FETCH_SUCCESS, payload:res})    
                    }).catch((err)=>{
                    console.error(err)
                        dispatch({type:TYPE.FETCH_FAIL, payload:err})
                    })
                }
        }
        const handler = setTimeout(() => {
            searcFunction();
          }, config.delay);
          return () => {
            clearTimeout(handler);
          };
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[keyToSearch, config.delay, config.limit])
      const searchMoreResult = ( ) =>{
          const beginOfSearch = config.limit+1 + offset
        if(keyToSearch.length > 0){
            dispatch({type:TYPE.MORE_REQUEST})
            searchGifs({search:keyToSearch, offset:beginOfSearch}).then(res=>{
                dispatch({type:TYPE.MORE_SUCCESS, payload:{results:res, offset: beginOfSearch} })
            }).catch((err)=>{
                dispatch({type:TYPE.MORE_FAIL, payload:err})
              console.error(err)
            })    
          }
      }  
      const setKeyToSearch = (keyword)=>{
          dispatch({type:TYPE.CHANGE_KEYWORD_TO_SEARCH, payload:keyword})
      }
    return {
        keyToSearch,
        setKeyToSearch,
        isSearching,
        searchResults,
        searchMoreResult,
        isSearchingMore
    }
}

export default useGifSearch