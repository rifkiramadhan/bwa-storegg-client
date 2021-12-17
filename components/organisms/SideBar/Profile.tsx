// import Image from 'next/image';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { JWTPayloadTypes, UserTypes } from '../../../services/data-types';

export default function Profile() {
  const [user, setUser] = useState({
    avatar: '',
    username: '',
    email: '',
  });
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      // user Bisa Diganti Dengan userFromPayload
      // const IMG = process.env.NEXT_PUBLIC_IMG;
      // user.avatar = `${IMG}/${userFromPayload.avatar}`;
      setUser(userFromPayload);
    }
  }, []);
  return (
        <div className="user text-center pb-50 pe-30">
            <img src={`${process.env.NEXT_PUBLIC_IMG}/${user.avatar}`} alt="Profile" width="90" height="90" className="img-fluid rounded rounded-circle mb-20" />
            <h2 className="fw-bold text-xl color-palette-1 m-0">{user.username}</h2>
            <p className="color-palette-2 m-0">{user.email}</p>
        </div>
  );
}
