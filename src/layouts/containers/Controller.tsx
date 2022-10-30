import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { signIn, signOut } from '../../reducers/profileSlice';
import { Maintenance } from '../../views/Home';

const Controller = ({ children }: any) => {
  // useNotification();
  const dispatch = useDispatch();
  const [isMaintain] = useState(false);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('profile')!);
      const { exp } = jwtDecode(profile.accessToken) as any;
      if (Date.now() / 1000 < exp - 600) {
        dispatch(signIn(profile));
      }
    } catch {
      dispatch(signOut({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useQuery(['fetchPayments'], () => systemService.fetchPayments(), { staleTime: Infinity });

  // useQuery(['fetchConfig'], () => systemService.fetchConfig(), {
  //   onSuccess: (data) => {
  //     setIsMaintain(data.isMaintainceEnabled);
  //     dispatch(saveSystem(data));
  //   },
  //   onError: () => {
  //     setIsMaintain(true);
  //   },
  //   onSettled: () => {
  //     setIsSuccess(true);
  //   },
  // });

  return isMaintain ? <Maintenance /> : children;
};

export default Controller;
