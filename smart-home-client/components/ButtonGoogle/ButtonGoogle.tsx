import styles from "./ButtonGoogle.module.scss";
import { ButtonGoogleProps } from "./ButtonGoogle.props";
import cn from "classnames";

export const ButtonGoogle = ({
  children,
  className,
  ...props
}: ButtonGoogleProps): JSX.Element => {
  const clientId =
    "976194357979-6kkcn7c4edk7h80blrb5vkiokqfc60u4.apps.googleusercontent.com";
  const redirectUri = "http://localhost:3000/api/user";
  const scope = "openid profile email";
  const state = "super-super";

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;

  return (
    <button
      onClick={() => (window.location.href = authUrl)}
      className={cn(styles.button, className, {})}
      {...props}
    >
      {children}
    </button>
  );
};
