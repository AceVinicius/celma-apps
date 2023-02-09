import { Breadcrumb, FloatButton, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

function Root() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div className="App">
      <Layout>

        <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
          <div
            style={{
              float: 'left',
              width: 120,
              height: 31,
              margin: '16px 24px 16px 0',
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Menu
            style={{ flex: '1', justifyContent: 'end' }}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(3).fill(null).map((_, index) => ({
              key: String(index + 1),
              label: `nav ${index + 1}`,
            }))}
          />
        </Header>

        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>
            <Outlet />
          </div>

        </Content>

        <Footer style={{ textAlign: 'center' }}>GE Celma ©2023 - Criado por GEINF</Footer>

      </Layout>
      <FloatButton.BackTop type="primary" />
    </div>
  )
}

export default Root
