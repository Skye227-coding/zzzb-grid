import zzzbGrid from '../components/zzzb-grid'
const components = {
  install(Vue){
    Vue.component('zzzbGrid','zzzbGrid');
  }

};
if(typeof window!=='undefined'&&window.Vue){
    window.Vue.use(components);
}
export default components;