import { useParams } from 'react-router-dom';
import SignText from './SignText';
import { useContext, useEffect } from 'react';
import AppContext from './context';
import SignImage from './SignImage';
import SignNotFound from './SignNotFound';


const Sign = () => {
  const { client, sign } = useContext(AppContext)
  const { id } = useParams()
  useEffect(() => {
    client.getSign(id)
  }, [id])

  return (
    <>
      {sign ? (
        <>
          <SignImage/>
          <SignText/>
        </>
      ) : (
        <SignNotFound/>
      )}
    </>
  )
}

export default Sign;