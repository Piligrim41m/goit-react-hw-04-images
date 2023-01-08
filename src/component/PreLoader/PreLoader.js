import {ColorRing} from 'react-loader-spinner';
import s from './PreLoader.module.css';

export default function Preloader() {
  return (
    <div className={s.loader}>
      <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
      {/* <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> */}
    </div>
  );
}
