import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getOneProfilePic } from '../../services/profile_pics'

const ProfilePicContainer = styled.div`
  height: ${props => props.size ? props.size : 30}px;
  width: ${props => props.size ? props.size : 30}px;
  background-image: url('${props => props.picUrl}');
  background-color: white;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
`

export default function ProfilePic(props) {
  const [picUrl, setPicUrl] = useState('')

  useEffect(() => { loadPic() }, [props.currentUser])

  const loadPic = async () => {
    if (props.currentUser) {
      const resp = await getOneProfilePic(props.currentUser.profile_pic_id)
      setPicUrl(resp.image)
    }
  }

  return (
    <ProfilePicContainer
      size={props.size}
      onClick={props.onClick}
      currentUser={props.currentUser}
      picUrl={picUrl}
    />
  )
}
