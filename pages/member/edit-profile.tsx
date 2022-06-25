import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Input from '../../components/atoms/Input';
import SideBar from '../../components/organisms/SideBar';
import { JWTPayloadTypes, UserTypes } from '../../services/data-types';
import { updateProfile } from '../../services/member';

interface UserStateTypes {
  id: string;
  name: string;
  email: string;
  avatar: any;
  phoneNumber: string;
}

export default function EditProfile() {
  const [user, setUser] = useState<UserStateTypes>({
    id: '',
    name: '',
    email: '',
    avatar: '',
    phoneNumber: '',
  });

  const [imagePreview, setImagePreview] = useState('/');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: UserTypes = payload.player;
      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    setLoading(true);

    const data = new FormData();

    data.append('image', user.avatar);
    data.append('name', user.name);
    data.append('phoneNumber', user.phoneNumber);
    const response = await updateProfile(data, user.id);

    if (user.name === '') {
      toast.error('Silahkan Refresh dan Input Nama Lengkap Anda!');
      return false;
    }
    if (user.phoneNumber === '') {
      toast.error('Silahkan Refresh dan Input Nomor Telepon Anda!');
      return false;
    }

    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove('token');
      router.push('/sign-in');
    }
    setLoading(false);
  };

  const IMG = process.env.NEXT_PUBLIC_IMG;
  return (
        <section className="edit-profile overflow-auto">
          <SideBar activeMenu="settings" />
          <main className="main-wrapper">
              <div className="ps-lg-0">
                  <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
                  <div className="bg-card pt-30 ps-30 pe-30 pb-30">
                      <form action="">
                          <div className="photo d-flex">
                              <div className="image-upload">
                                  <label htmlFor="avatar">
                                      {imagePreview === '/' ? (
                                        <img src={`${IMG}/${user.avatar}`} className="rounded-circle" alt="icon upload" width={90} height={90} />
                                      ) : (
                                        <img src={imagePreview} className="rounded-circle" alt="icon upload" width={90} height={90} />
                                      )}
                                  </label>
                                  <input
                                    id="avatar"
                                    type="file"
                                    name="avatar"
                                    accept="image/png, image/jpeg"
                                    onChange={(event) => {
                                      const img = event.target.files![0];
                                      setImagePreview(URL.createObjectURL(img));
                                      return setUser({
                                        ...user,
                                        avatar: img,
                                      });
                                    }}
                                  />
                              </div>
                          </div>
                          <div className="pt-30">
                              <Input
                                label="Full Name"
                                value={user.name}
                                onChange={(event) => setUser({
                                  ...user,
                                  name: event.target.value,
                                })}
                              />
                          </div>
                          <div className="pt-30">
                              <Input
                                label="Email Address"
                                value={user.email}
                                onChange={(event) => setUser({
                                  ...user,
                                  email: event.target.value,
                                })}
                                disabled
                              />
                          </div>
                          <div className="pt-30">
                              <Input
                                placeholder="Enter your phone"
                                label="Phone"
                                value={user.phoneNumber}
                                onChange={(event) => {
                                  return setUser({
                                    ...user,
                                    phoneNumber: event.target.value,
                                  });
                                }}
                              />
                          </div>
                          <div className="button-group d-flex flex-column pt-50">
                            {loading
                              ? (
                                <button
                                  type="button"
                                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                  disabled
                                >
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                                {' '}
                                Loading...
                                </button>
                              )
                              : (
                                <button
                                  type="button"
                                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                  onClick={onSubmit}
                                >Save My Profile
                                </button>
                              )}
                          </div>
                      </form>
                  </div>
              </div>
          </main>
        </section>
  );
}
