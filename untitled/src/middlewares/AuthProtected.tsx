import { AuthStorage } from "../infrastructure/localStorage/authStorage.ts";
import { useUnit } from "effector-react/effector-react.umd";
import { $pageChanged } from "../states/routing/events.ts";
import { Pages } from "../dtos/routing/page.ts";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

function AuthProtected({ children }: Props) {
  const pageChanged = useUnit($pageChanged);
  const isAuthenticated = AuthStorage.isToken();

  useEffect(() => {
    if (!isAuthenticated) {
      pageChanged(Pages.LOGIN);
    }
  }, []);

  return isAuthenticated ? children : "";
}

export default AuthProtected;
