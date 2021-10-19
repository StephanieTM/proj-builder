module.exports = (options) => {
  const { needGithubPages, projName, projCategory } = options;
  const [primary, secondary] = options.customTheme.split(',');

  return [{
    fileName: 'app/config/axios-config.ts',
    content:
`import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

export function configAxios(): void {
  axios.interceptors.response.use(response => {
    return response.data;
  }, error => {
    if (error.response.config.headers.silent !== true) {
      if (error.response.status === 404) {
        toast({
          status: 'error',
          description: \`\${error.response.status}, \${error.response.config.url} not found.\`,
        });
      } else {
        toast({
          status: 'error',
          description: error.response.data.message || error.response.data.error || error.response.data,
        });
      }
    }
  
    return Promise.reject(error);
  });
}
`,
  }, {
    fileName: 'app/layout/Body.tsx',
    content:
`import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useClassName } from 'app/utils';
import { IBodyProps } from './interface';

export default function Body(props: IBodyProps): JSX.Element {
  const { routes } = props;
  const c = useClassName();
  const spinner = (
    <div className={c('app-body-spinner')}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="brand.200"
        color="brand.500"
        size="lg"
      />
    </div>
  );

  return (
    <div className={c('app-body-container')}>
      <div className={c('app-body-content')}>
        <div className={c('app-body-route')}>
          <Suspense fallback={spinner}>
            <Switch>
              {
                routes.map(route => (route.component && route.link) ? (
                  <Route
                    key={route.link}
                    exact
                    path={route.link}
                    component={lazy(route.component)}
                  />
                ) : null)
              }
            </Switch>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
`,
  }, {
    fileName: 'app/layout/global-store.ts',
    content:
`import { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { createContainer } from 'unstated-next';
import { IRouteConfig, routes } from '../routers/routes';
import { getApplication } from './utils';
import { IValue, IApplication } from './interface';

const appList = getApplication(routes);

function useGlobalStore(): IValue {
  const isMobile = useMediaQuery({ query: '(max-width: 540px)' });
  const apps = useMemo(() => {
    return appList;
  }, []);
  const [currentApp, setCurrentApp] = useState<IApplication|Record<string, never>>(apps[0] || {});
  const [appDrawerVisible, setAppDrawerVisible] = useState<boolean>(false);
  const menus = useMemo<IRouteConfig[]>(() => {
    return ((currentApp as IApplication).menus || []);
  }, [currentApp]);

  return {
    apps,
    menus,
    currentApp,
    setCurrentApp,
    appDrawerVisible,
    setAppDrawerVisible,
    isMobile,
  };
}

export default createContainer<IValue>(useGlobalStore);
`,
  }, {
    fileName: 'app/layout/Header.tsx',
    content:
`import React from 'react';
import { Link } from 'react-router-dom';
import { useClassName } from 'app/utils';

export default function Header(): JSX.Element {
  const c = useClassName();

  return (
    <div className={c('app-header-container')}>
      <div className={c('menu-container')}>
        <Link to="/" className={c('menu-link')}>Home</Link>
        <Link to="/projects" className={c('menu-link')}>Projects</Link>
      </div>
    </div>
  );
}
`,
  }, {
    fileName: 'app/layout/index.less',
    content:
`@menu-link-color: #fff;

.app-container {
  height: 100%;
}

.app-header-container {
  position: fixed;
  top: 0;
  z-index: 500;
  width: 100%;
  background-color: @primary;

  &-pc {
    height: @pc-header-height;
    padding: 0 @pc-container-padding;
  }

  &-mobile {
    height: @mobile-header-height;
    padding: 0 @mobile-container-padding;
  }

  .menu-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    margin: auto;

    &-pc {
      max-width: @pc-max-container-width;
      font-size: 16px;
    }

    &-mobile {
      font-size: 1rem;
    }

    .menu-link {
      color: @menu-link-color;

      &-pc {
        margin-left: @pc-container-padding;
        border-bottom: 2px dashed transparent;
        transition: border-bottom-color 0.8s;

        &:hover {
          border-bottom: 2px dashed @menu-link-color;
        }
      }

      &-mobile {
        margin-left: @mobile-container-padding;
      }
    }
  }
}

.app-body-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &-pc {
    height: calc(100vh - @pc-header-height);
  }

  &-mobile {
    height: calc(100vh - @mobile-header-height);
  }
}

.app-body-container {
  height: 100%;

  &-pc {
    padding: @pc-header-height @pc-container-padding;
  }

  &-mobile {
    padding: @mobile-header-height @mobile-container-padding;
  }

  .app-body-content {
    margin: auto;

    &-pc {
      max-width: @pc-max-container-width;
    }
  }

  .app-body-route {
    &-pc {
      padding: @pc-container-padding 0;
    }

    &-mobile {
      padding: @mobile-container-padding 0;
    }
  }
}

.common-content-link {
  color: @primary;
  border-bottom: 2px solid @primary;
  transition: border-color 0.6s;

  &:hover {
    border-bottom: 2px solid transparent;
  }
}
`,
  }, {
    fileName: 'app/layout/index.tsx',
    content:
`import React from 'react';
import { IRouteConfig, routes } from 'app/routers/routes';
import Header from './Header';
import Body from './Body';
import './index.less';

function getRoutes(allRouters: IRouteConfig[]): IRouteConfig[] {
  const getFlattenRoutes = (routeItem: IRouteConfig[] = allRouters, result: IRouteConfig[] = []): IRouteConfig[] => {
    routeItem.forEach(item => {
      if (item.children) {
        result.concat(getFlattenRoutes(item.children, result));
      } else {
        result.push(item);
      }
    });
    return result;
  };

  return getFlattenRoutes();
}

export default function AppLayout(): JSX.Element {
  const flattenRoutes = getRoutes(routes);

  return (
    <div className="app-container">
      <Header />
      <Body routes={flattenRoutes} />
    </div>
  );
}
`,
  }, {
    fileName: 'app/layout/interface.ts',
    content:
`import { Dispatch, SetStateAction } from 'react';
import { IRouteConfig } from '../routers/routes';

export interface IValue {
  apps: Array<IApplication|Record<string, never>>;
  menus: IRouteConfig[];
  currentApp: IApplication|Record<string, never>;
  setCurrentApp: Dispatch<SetStateAction<IApplication|Record<string, never>>>;
  appDrawerVisible: boolean;
  setAppDrawerVisible: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
}

export interface IApplication extends IRouteConfig {
  menus: IRouteConfig[];
  code: string;
  key: string;
}

export interface IBodyProps {
  routes: IRouteConfig[];
}
`,
  }, {
    fileName: 'app/layout/utils.ts',
    content:
`import { matchPath } from 'react-router';
import { IRouteConfig } from 'app/routers/routes';
import { IApplication } from './interface';

export * from './interface';

export function getFirstLink(routes: IRouteConfig[] = []): string {
  for (let i = 0; i < routes.length; i += 1) {
    const currentRoute = routes[i];
    if (currentRoute.link) {
      return currentRoute.link;
    }

    const link = getFirstLink(currentRoute.children);
    if (link) {
      return link;
    }
  }
  return '';
}

export function getApplication(apps: IRouteConfig[]): IApplication[] {
  return apps
    .filter(app => app.children && app.children.length && !app.hideInMenu)
    .map(({ children, ...app }) => ({
      link: getFirstLink(children),
      menus: children || [],
      key: app.code as string,
      code: app.code as string,
      ...app,
    }));
}

export function isMatch(pathname: string, route: IRouteConfig): boolean {
  if (!route.children) {
    return !!matchPath(pathname, { path: route.link, exact: true });
  }

  for (let i = 0; i < route.children.length; i++) {
    if (isMatch(pathname, route.children[i])) {
      return true;
    }
  }

  return false;
}

export function findActiveApp(apps: IApplication[]): IApplication|Record<string, never> {
  const matchedApp = apps.filter(app => isMatch(window.location.pathname, app));

  if (matchedApp.length) {
    return matchedApp[0];
  }

  return apps[0] || {};
}

export function isMatchedUrl(keyword = ''): boolean {
  const { pathname } = location;
  const pathnameLen = pathname.length;
  const indexLocation = pathname.indexOf('' + keyword);
  if (indexLocation > -1) {
    if (indexLocation + keyword.length === pathnameLen) {
      return true;
    } else if (pathnameLen > indexLocation + keyword.length) {
      const nextStr = pathname[indexLocation + 1];
      if (nextStr === '/' || nextStr === '?') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function findMatchedMenu(menus: IRouteConfig[] = [], appCode: string): { selectedKeys: string[]; openKeys: string[] } {
  for (const menu of menus) {
    if (!menu.children || !menu.children.length) {
      if (isMatchedUrl(menu.link)) {
        return {
          selectedKeys: [getMenuKey(menu, appCode)],
          openKeys: [],
        };
      }
    } else {
      for (const child of menu.children) {
        if (isMatchedUrl(child.link)) {
          return {
            selectedKeys: [getMenuKey(child, appCode)],
            openKeys: [getMenuKey(menu, appCode)],
          };
        }
      }
    }
  }
  return {
    selectedKeys: [],
    openKeys: [],
  };
}

export function getMenuKey({ children, title, link }: IRouteConfig, appCode = ''): string {
  if (!children || !children.length) {
    return link as string;
  }
  return \`\${appCode}-\${title}\`;
}
`,
  }, {
    fileName: 'app/routers/routes.ts',
    content:
`import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type ILoadComponent = Promise<{ default: ComponentType<RouteComponentProps>}>;

export interface IRouteConfig {
  title: string;
  link?: string;
  code?: string;
  key?: string;
  children?: IRouteConfig[];
  component?: () => ILoadComponent;
  hideInMenu?: boolean;
  icon?: JSX.Element;
}

export const routes: IRouteConfig[] = [
  {
    title: 'Home',
    code: 'home',
    link: '/',
    component: () => import('src/components/homepage'),
  },
  {
    title: 'Projects',
    code: 'projects',
    link: '/projects',
    component: () => import('src/components/projects'),
  },
];
`,
  }, {
    fileName: 'app/theme/index.ts',
    content:
`import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      200: '${primary}',
      500: '${secondary}',
    },
  },
  styles: {
    global: {
      body: {
        fontFamily: \`Rubik, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif\`,
      },
    },
  },
});
`,
  }, {
    fileName: 'app/utils/hooks.ts',
    content:
`import { useCallback } from 'react';
import GlobalStore from 'app/layout/global-store';

export function useClassName(): (className: string) => string {
  const { isMobile } = GlobalStore.useContainer();

  return useCallback((className: string): string => {
    return \`\${className} \${className}-\${isMobile ? 'mobile' : 'pc'}\`;
  }, [isMobile]);
}
`,
  }, {
    fileName: 'app/utils/index.ts',
    content:
`export * from './hooks';
`,
  }, {
    fileName: 'app/index.less',
    content:
`@import '../assets/fonts/font.css';

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}
`,
  }, {
    fileName: 'app/index.tsx',
    content:
`import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { theme } from './theme';
import { configAxios } from './config/axios-config';
import AppLayout from './layout';
import GlobalStore from './layout/global-store';
import './index.less';

configAxios();
dayjs.locale('zh-cn');

function App(): JSX.Element {
  return (
    <GlobalStore.Provider>
      <ChakraProvider theme={theme}>
        <Router${needGithubPages && projCategory === 'commonProj' ? ` basename="/${projName}"` : ``}>
          <AppLayout />
        </Router>
      </ChakraProvider>
    </GlobalStore.Provider>
  );
}

const HotApp = hot(App);

ReactDom.render(
  <HotApp />,
  document.getElementById('app')
);
`,
  }];
};
