const path =  require('path');
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);

module.exports={
   publicPath:"./",
   outputDir:"dist",
   assetsDir:"static",
   lintOnSave:false,
   runtimeCompiler:true,
   chainWebpack:config=>{
    config.resolve.symlinks(true);
    config.plugin("html").tap(args => {
        // 修复 Lazy loading routes Error
      args[0].chunksSortMode = "none";
      return args;
    });
    config.resolve.alias
      .set('@',resolve('src'))

   },
   css:{
      loaderOptions:{
          css:{

          },

      } 
   },
   devServer:{
       host:"localhost",
       port:8080,
       https:false,
       open:false
   }

}