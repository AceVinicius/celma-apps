import { Button, Form, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

function AppsEdit() {
  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600, margin: 'auto' }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Nome do app"
      name="name"
      rules={[{ required: true, message: 'Preencha o nome do app!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Descrição do app"
      name="description"
      rules={[{ required: false, message: 'Preencha !' }]}
    >
      <TextArea rows={4} />
    </Form.Item>

    <Form.Item
      label="URL"
      name="url"
      rules={[{ required: true, message: 'Preencha a url!' }]}
    >
      <Input addonBefore="http://" />
    </Form.Item>

    <Form.Item
      label="Habilitar link"
      name="is_active"
    >
      <Switch checked checkedChildren="Sim" unCheckedChildren="Não" />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Criar link
      </Button>
    </Form.Item>
  </Form>
  );
}

export default AppsEdit;