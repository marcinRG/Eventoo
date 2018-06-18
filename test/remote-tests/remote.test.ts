import {databaseStorageService} from '../../src/app/utilities/database.storage.utils';
import {ICategory} from '../../src/app/model/ICategory';
import {fileStorageService} from '../../src/app/utilities/files.storage.utils';

const idInput = <HTMLInputElement> document.querySelector('input[name="id"]');
const nameInput = <HTMLInputElement> document.querySelector('input[name="name"]');
const descriptionInput = <HTMLTextAreaElement> document.querySelector('textarea[name="description"]');
const imgInput = <HTMLInputElement> document.querySelector('input[name="img"]');
const printOutput = <HTMLTextAreaElement> document.querySelector('textarea[name="output-list"]');

let filename: string = '';

// console.log(idInput);
// console.log(nameInput);
// console.log(descriptionInput);
// console.log(imgInput);

const prepareValues = (): ICategory => {
    return {
        id: idInput.value,
        name: nameInput.value,
        description: descriptionInput.value,
        img: imgInput.value,
    };
};

const updateBtn = document.querySelector('#updat-btn');
const deleteBtn = document.querySelector('#delet-btn');
const addBtn = document.querySelector("#ad-btn");
const deleteAllBtn = document.querySelector("#remove-all");
const printValuesBtn = document.querySelector("#print-all");
const fileBtn = <HTMLInputElement>document.querySelector("#file-btn");


addBtn.addEventListener('click', () => {
    console.log('add');
    console.log(prepareValues());
    databaseStorageService.addCategory(prepareValues()).then(() => {
        console.log('add succesful');
    });
});

deleteBtn.addEventListener('click', () => {
    console.log('delet');
    console.log(prepareValues());
    databaseStorageService.removeCategory(prepareValues())
        .then(() => {
            console.log('dilet suksesful');
        })
        .catch((error) => {
            console.log('delete unsuccessful');
            console.log(error);
        });
});

updateBtn.addEventListener('click', () => {
    console.log('pdate');
    databaseStorageService.updateCategory(prepareValues())
        .then(() => {
            console.log('update success!');
        })
        .catch((error) => {
            console.log('error occured');
            console.log(error);
        })
});

deleteAllBtn.addEventListener('click', () => {
    console.log('delete all');
    databaseStorageService.removeAllCategories().then(() => {
        console.log('delete successful');
    });
});

printValuesBtn.addEventListener('click', () => {
    console.log('print values');
    printOutput.value = "";
    databaseStorageService.getAllCategories().then((value) => {
        for (let val of value) {
            printOutput.value = printOutput.value + `${val.name} ${val.description} ${val.img} \n`;
        }
    });
});

function change(snapshot) {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
}

fileBtn.addEventListener('change', (event: any) => {
    let file = event.target.files[0];
    filename = file.name;
    fileStorageService.saveCategoryImage(file,change).then((val)=>{
        console.log(val);
    });
    console.log();
});
