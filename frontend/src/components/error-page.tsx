import { Button, Result } from "antd";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    // <div id="error-page">
    //   <h1>Oops!</h1>
    //   <p>Sorry, an unexpected error has occurred.</p>
    //   <p>
    //     <i>{error.statusText || error.message}</i>
    //   </p>
    // </div>
    <Result
      status={`${error.status}`}
      title={`${error.status}`}
      subTitle={ `Desculpe, um erro inesperado aconteceu. (${error.statusText || error.message}`}
      extra={<Button type="primary">Voltar para tela inicial</Button>}
    />
  );
}

export default ErrorPage;
