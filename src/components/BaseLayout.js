import {Link} from "react-router-dom";
import {Layout, Menu} from "antd";
import "./BaseLayout.css";

const {Header, Sider, Content, Footer} = Layout;

export default function BaseLayout(props) {
    return (
        <Layout className="site-layout">
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="logo">问答平台后台</div>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={props.location.pathname}>
                    <Menu.Item key="/users">
                        <Link to="/users">用户管理</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        问题管理
                    </Menu.Item>
                    <Menu.Item key="3">
                        回答管理
                    </Menu.Item>
                    <Menu.Item key="4">
                        圈子管理
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-header"/>
                <Content className="site-layout-content">
                    <div className="site-layout-background">
                        {props.children}
                    </div>
                </Content>
                <Footer className="site-layout-footer">footer</Footer>
            </Layout>
        </Layout>
    );
}
