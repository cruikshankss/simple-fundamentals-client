import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import MovieForm from '../shared/MovieForm'

const MovieCreate = props => {
  const [movie, setMovie] = useState({ title: '', director: '', year: '' })
  const [createdMovieId, setCreatedMovieId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedMovie = Object.assign({ ...movie }, updatedField)
    setMovie(editedMovie)

    // console.log({ ...movie, [event.target.name]: event.target.value })

    // setMovie({ ...movie, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/movies`,
      method: 'POST',
      data: { movie }
    })
      .then(res => setCreatedMovieId(res.data.movie.id))
      .catch(console.error)
  }

  if (createdMovieId) {
    return <Redirect to={`/movies/${createdMovieId}`} />
  }

  return (
    <Layout>
      <MovieForm
        movie={movie}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default MovieCreate
