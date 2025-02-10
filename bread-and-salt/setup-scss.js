const fs = require('fs');
const path = require('path');

// Define SCSS structure
const scssStructure = {
  "src/assets/styles/abstracts": [
    "_variables.scss",
    "_mixins.scss",
    "_functions.scss"
  ],
  "src/assets/styles/base": [
    "_reset.scss",
    "_typography.scss"
  ],
  "src/assets/styles/components": [
    "_button.scss",
    "_card.scss"
  ],
  "src/assets/styles/layouts": [
    "_header.scss",
    "_footer.scss"
  ],
  "src/assets/styles/themes": [
    "_dark.scss",
    "_light.scss"
  ],
  "src/assets/styles": [
    "main.scss"
  ]
};

// SCSS file content templates
const fileContents = {
  "_variables.scss": `$primary-color: #007bff;
$secondary-color: #6c757d;
$font-stack: 'Roboto', sans-serif;`,

  "_mixins.scss": `@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin responsive($breakpoint) {
  @if $breakpoint == tablet {
    @media (max-width: 768px) { @content; }
  } @else if $breakpoint == mobile {
    @media (max-width: 480px) { @content; }
  }
}`,

  "_reset.scss": `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}`,

  "_typography.scss": `body {
  font-family: $font-stack;
  color: $primary-color;
}`,

  "_button.scss": `.button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}`,

  "_card.scss": `.card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}`,

  "main.scss": `// Abstracts
@import 'abstracts/variables';
@import 'abstracts/mixins';
@import 'abstracts/functions';

// Base styles
@import 'base/reset';
@import 'base/typography';

// Layouts
@import 'layouts/header';
@import 'layouts/footer';

// Components
@import 'components/button';
@import 'components/card';

// Themes
@import 'themes/dark';
@import 'themes/light';
`
};

// Function to create directories and files
function createScssStructure() {
  Object.keys(scssStructure).forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }

    scssStructure[dir].forEach(file => {
      const filePath = path.join(dir, file);
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, fileContents[file] || "", "utf8");
        console.log(`Created file: ${filePath}`);
      }
    });
  });
}

// Function to update angular.json
function updateAngularJson() {
  const angularJsonPath = path.resolve("angular.json");

  if (!fs.existsSync(angularJsonPath)) {
    console.error("❌ angular.json not found. Run this script from the Angular project root.");
    return;
  }

  let angularJson = JSON.parse(fs.readFileSync(angularJsonPath, "utf8"));
  
  if (angularJson.projects) {
    const projectName = Object.keys(angularJson.projects)[0]; // Get the first project
    const stylesArray = angularJson.projects[projectName].architect.build.options.styles;

    const newStylePath = "src/assets/styles/main.scss";
    if (!stylesArray.includes(newStylePath)) {
      stylesArray.push(newStylePath);
      fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2), "utf8");
      console.log(`✅ Updated angular.json to include ${newStylePath}`);
    } else {
      console.log(`ℹ️ angular.json already includes ${newStylePath}`);
    }
  } else {
    console.error("❌ Invalid angular.json format.");
  }
}

// Run script
createScssStructure();
updateAngularJson();

console.log("\n🎉 SCSS setup complete! Restart your Angular server for changes to take effect.");
