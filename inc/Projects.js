/*────────────────────────────────────────────────────────────────────────────────────────────────*/

const File = new $.File('./db/projects.json', 'json');

/*────────────────────────────────────────────────────────────────────────────────────────────────*/
$.Projects = class {
/*┌──────────┐
  │ Свойства │
  └──────────┘*/
    static _list = [];// Кеш списока проектов
    
/*┌─────────────────────────┐
  │ Выводит ошибку на экран │
  └─────────────────────────┘*/
    static error(error_msg) {
        console.log('Ошибка!');
        console.log(error_msg);
    }
    
/*┌──────────────────────────┐
  │ Кеширует список проектов │
  └──────────────────────────┘*/
    static async cache() {
    // Получаем файл со списком проектов
        let res = await File.get();
        
    // Файл найден
        if (res.status == 'good') {
        // Кешируем список проектов
            this._list = res.content;
        }
        
    // Файл не найден
        else {
        // Создаем новый файл со списком проектов
            this.create();
        }
    }
    
/*┌────────────────────────────────────────┐
  │ Создает новый файл со списком проектов │
  └────────────────────────────────────────┘*/
    static async create() {
    // Создаем новый файл со списком проектов
        let res = await File.add(this._list);
        
    // Неизвестная ошибка
        if (res.status == 'error' && res.error_code != 102) {
            this.error(res);
        }
    }
    
/*┌────────────────────────┐
  │ Добавляет новый проект │
  └────────────────────────┘*/
    static add(new_project) {
    // Добавляем проект в кеш
        this._list.push(new $.Project(new_project));
        
    // Обновляем файл со списком проектов
        this.update();
    }
    
/*┌────────────────────────────────────┐
  │ Обновляет файл со списком проектов │
  └────────────────────────────────────┘*/
    static async update() {
    // Обновляем информацию в файле
        let res = await File.set(this._list);
        
    // Неизвестная ошибка
        if (res.status == 'error' && res.error_code != 102) {
            this.error(res);
        }
    }
};

/*▄────────────────────────────▄
  █                            █
  █  Кешируем список проектов  █
  █                            █
  ▀────────────────────────────▀*/
$.Projects.cache();

/*────────────────────────────────────────────────────────────────────────────────────────────────*/