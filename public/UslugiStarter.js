const axios = require('axios');
const fs = require('fs');

(async () => {
    try {
        const response = await axios.get("https://5189807337ef00ab.mokky.dev/UslugiComponentMDEV");
        const locations = response.data;

        let indexHtmlContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Ссылки на страницы</title>
            <link rel="stylesheet" href="UslugiStyles.css">
        </head>
        <body>
            <h1>Ссылки на страницы</h1>
            <ul>
        `;

        // Генерация HTML-страниц и сбор ссылок
        for (let index = 0; index < locations.length; index++) {
            const location = locations[index];
            const htmlContent = `
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${location.title}</title>
    <link rel="stylesheet" href="UslugiStyles.css">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <script src="https://unpkg.com/vue@3"></script>
</head>
<body>
    <div id="app">
        <my-component></my-component>
    </div>

    <script>
        const app = Vue.createApp({
            components: {
                'my-component': {
                    template: \`
          <nav class="flex justify-between items-center bg-zinc-800">
            <a href="../src/components/SobytiaComponent.vue">
              <div class="ml-5 flex items-center gap-2">
                <img
                  src="favicon.ico"
                  alt="Logo"
                  id="LOGOico"
                  class="w-10 h-10 rounded-md"
                />
                <span class="text-white text-lg font-bold">MyPetro</span>
              </div>
            </a>

            <div id="referenceDiv" class="flex-1 flex justify-center space-x-4">
            <a href="../src/components/SobytiaComponent.vue">
              Услуги  -->  ${location.header}
            </a>
            </div>
          </nav>
                    <div id="main">
                        <h1 class="header">${location.header}</h1>
                        <div id="par">
                        <span id="image-container">
                            <img src="${location.imageUrl}" alt="#">
                        </span>
                            <div>
                            <p>Тип: <strong>${location.type}</strong></p>
                            <p>Адрес: <strong>${location.location}</strong></p>
                            </div>
                          </div>
                    </div>\`
                }
            }
        });
        app.mount('#app');
    </script>
</body>
</html>
            `;

            const fileName = `UslugiComponentGenerated${index + 1}.html`;

            // Создание файла для каждого местоположения
            fs.writeFileSync(fileName, htmlContent);
            console.log(`${fileName} был создан.`);

            // Добавление ссылки в главный HTML
            indexHtmlContent += `<li><a href="" href="${fileName}">${location.title}</a></li>\n`;
        }

        // Закрытие списка и тела документа
        indexHtmlContent += `
            </ul>
        </body>
        </html>
        `;

        // Создание главного HTML-файла со ссылками
        fs.writeFileSync('indexUslugi.html', indexHtmlContent);
        console.log('indexUslugi.html был создан.');

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
})();
