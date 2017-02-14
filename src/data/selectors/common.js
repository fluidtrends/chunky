import { createSelector } from 'reselect'

const stateItem = (name, item) => (state, props) => state[name][item]

export const get = (name, item) => createSelector(stateItem(name, item),
                         (data) => (typeof data === 'function' ? data() : data))

export const has = (name, item) => createSelector(stateItem(name, item),
                         (data) => (data != null && data != undefined))

export const hasData = (name) => has(name, "data")
export const hasError = (name) => has(name, "error")

export const getTimestamp = (name) => get(name, "timestamp")
export const getData = (name) => get(name, "data")
export const getError = (name) => get(name, "error")
