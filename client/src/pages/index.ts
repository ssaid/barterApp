import { lazy } from 'react'

export const Home = lazy(() => import('./Home'))
export const Login = lazy(() => import('./Login'))
export const Register = lazy(() => import('./Register'))
export const Favourites = lazy(() => import('./Favourites'))
export const BasicInformation = lazy(() => import('./BasicInformation'))
export const Fallback = lazy(() => import('./Fallback'))
export const MyPosts = lazy(() => import('./MyPosts'))
export const CreatePost = lazy(() => import('./CreatePost'))
export const Logout = lazy(() => import('./Logout'))
export const Detail = lazy(() => import('./Detail'))
export const EditPost = lazy(() => import('./EditPost'))

