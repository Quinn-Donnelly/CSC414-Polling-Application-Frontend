// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Login/reducer'),
          import('containers/Login/sagas'),
          import('containers/Login'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('login', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/questionpage',
      name: 'questionsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/QuestionsPage/reducer'),
          import('containers/QuestionsPage/sagas'),
          import('containers/QuestionsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('questionsPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/home',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Home/reducer'),
          import('containers/Home/sagas'),
          import('containers/Home'),

          import('containers/CourseList/reducer'),
          import('containers/CourseList/sagas'),
          import('containers/CourseList'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component, courseReducer, courseSagas]) => {
          injectReducer('home', reducer.default);
          injectSagas(sagas.default);
          injectReducer('courseList', courseReducer.default);
          injectSagas(courseSagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/signup',
      name: 'signup',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Signup/reducer'),
          import('containers/Signup/sagas'),
          import('containers/Signup'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('signup', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/coursepage',
      name: 'coursePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/CoursePage/reducer'),
          import('containers/CoursePage/sagas'),
          import('containers/CoursePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('coursePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
