import { useContext } from 'react';
import AppContext from './context';
import { css } from '@emotion/css';

const SignImage = () => {
  const { sign, baseUrl } = useContext(AppContext)

  const signImageContainerStyles = css`
    width: 100%;
    max-width: 400px;
  `;

  const signImageStyles = css`
    width: 100%;
    object-fit: cover;
  `

  return (
    <div className={signImageContainerStyles}>
      {sign.signImageId && (
        <img
          data-cy="signImageEl"
          src={`${baseUrl}/sign-images/${sign.signImageId}`}
          alt={`${sign.title}`}
          className={signImageStyles}
        />
      )}
    </div>
  );
};

export default SignImage;