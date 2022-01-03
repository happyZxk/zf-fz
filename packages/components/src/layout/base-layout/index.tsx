import React, { useState } from "react";
import cs from "classnames";
import { Layout, Menu, Message } from "@arco-design/web-react";
import {
  IconHome,
  IconCalendar,
  IconCaretRight,
  IconCaretLeft,
} from "@arco-design/web-react/icon";

import logo from "../../../public/logo.png";
import styles from "./index.less";
import FasPage from "@/component/fas-page";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Sider = Layout.Sider;
const Header = Layout.Header;

const BaseLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = () => {
    setCollapsed((state) => !state);
  };

  return (
    <>
      <Header className={cs(styles.header)}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </Header>

      <Layout className={cs(styles.container)}>
        <Sider
          collapsed={collapsed}
          onCollapse={handleCollapsed}
          collapsible
          trigger={collapsed ? <IconCaretRight /> : <IconCaretLeft />}
          breakpoint="xl"
        >
          <div className="logo" />
          <Menu
            defaultOpenKeys={["1"]}
            defaultSelectedKeys={["0_3"]}
            onClickMenuItem={(key) =>
              Message.info({ content: `You select ${key}`, showIcon: true })
            }
            style={{ width: "100%" }}
          >
            <MenuItem key="0_1">
              <IconHome />
              Menu 1
            </MenuItem>
            <MenuItem key="0_2">
              <IconCalendar />
              Menu 2
            </MenuItem>
            <MenuItem key="0_3">
              <IconCalendar />
              Menu 3
            </MenuItem>
            <SubMenu
              key="1"
              title={
                <span>
                  <IconCalendar />
                  Navigation 1
                </span>
              }
            >
              <MenuItem key="1_1">Menu 1</MenuItem>
              <MenuItem key="1_2">Menu 2</MenuItem>
              <SubMenu key="2" title="Navigation 2">
                <MenuItem key="2_1">Menu 1</MenuItem>
                <MenuItem key="2_2">Menu 2</MenuItem>
              </SubMenu>
              <SubMenu key="3" title="Navigation 3">
                <MenuItem key="3_1">Menu 1</MenuItem>
                <MenuItem key="3_2">Menu 2</MenuItem>
                <MenuItem key="3_3">Menu 3</MenuItem>
              </SubMenu>
            </SubMenu>
            <SubMenu
              key="4"
              title={
                <span>
                  <IconCalendar />
                  Navigation 4
                </span>
              }
            >
              <MenuItem key="4_1">Menu 1</MenuItem>
              <MenuItem key="4_2">Menu 2</MenuItem>
              <MenuItem key="4_3">Menu 3</MenuItem>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <FasPage>{children}</FasPage>
        </Layout>
      </Layout>
    </>
  );
};
export default BaseLayout;
