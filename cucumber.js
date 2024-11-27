module.exports = {
  
    default: {
      
      parallel: 2,
      paths: ["./src/features/**/*.feature"],
      requireModule: ['ts-node/register'],
      require: ["./src/steps/**/*.ts", "./src/hooks/**/*.ts"],

      format: [
        "progress-bar",                         
        "json:reports/cucumber-report.json",    
        "html:reports/cucumber-report.html",  
      ],
  
      formatOptions: { 
        snippetInterface: "async-await" 
      },
      worldParameters: {
        ...process.env,
      },
    },
  }