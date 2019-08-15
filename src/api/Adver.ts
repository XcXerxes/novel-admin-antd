/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 16:56:15
 * @LastEditTime: 2019-08-16 00:45:25
 * @LastEditors: Please set LastEditors
 */
import Request from './Request'

export interface IAdverParams {
  title: string;
  caption: string;
  type: number;
  url: string;
  imgUrl: string;
}

export interface IAdverListParams {
  page?: number;
  rows?: number;
  type?: number;
}

export function createAdver (data:IAdverParams) {
  return Request('/adver/add', {
    body: JSON.stringify(data)
  })
}
export function getAdvers (data:IAdverListParams) {
  return Request('/advers', {
    method: 'get',
    qs: data
  })
}

export interface IAdverDeleteParams {
  id: string;
}
export function deleteAdverById (data: IAdverDeleteParams) {
  return Request('/adver/destory', {
    method: 'get',
    qs: data
  })
}
export function getAdverById (data: IAdverDeleteParams) {
  return Request('/adver', {
    method: 'get',
    qs: data
  })
}
export interface IAdverUpdateParams {
  id: string;
  title: string;
  caption: string;
  type: number;
  url: string;
  imgUrl: string;
}
export function updateAdverById (data: IAdverUpdateParams) {
  return Request('/adver/update', {
    body: JSON.stringify(data)
  })
}
