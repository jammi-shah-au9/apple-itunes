import action_types from '../actions/action_types'
import { takeLatest,put,delay,} from 'redux-saga/effects'
import { create } from 'apisauce'
const api = create({
    baseURL: 'https://itunes.apple.com',
  })

function* saga_fetch_artist(action){
    try {
    yield delay(2000)
    let artist_data=undefined
    yield api.get(`/search?term=${action.value}`).then((res)=>{
        artist_data=res.data
    }).catch((err)=>{console.log(err)})
    if(artist_data===null){
        console.log('failed to fetch data please try different name')
        alert('failed to fetch data please try different name')
    }else
    yield put({type:action_types.fetch_artist_async,payload: artist_data})   
    } catch (err) {
        yield console.log(err)
    }
}

function* saga_empty_artist_data(){
    try {
        yield put({type:action_types.empty_artist_data_async})        
    } catch (err) {
        yield console.log(err)
    }
}

export function* watch_fetch_artist(){
    yield takeLatest('fetch_artist',saga_fetch_artist)
    yield takeLatest('empty_artist_data',saga_empty_artist_data)
}