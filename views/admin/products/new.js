const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({errors}) =>{
return layout({
    content: ` 
         <div class="container">
    <div class="columns is-centered">
        <div class="column is-half-desktop">
            <form method="POST" enctype="multipart/form-data">
                <h1 class="title">Add New Product</h1>
                <div class="field">
                    <label class="label">Title</label>
                    <input   class="input" placeholder="Title" name="title" />
                    <p class="help is-danger">${getError(errors, 'title')}</p>
                </div>
                <div class="field">
                    <label class="label">Price</label>
                    <input   class="input" placeholder="Price" name="price" />
                    <p class="help is-danger">${getError(errors, 'price')}</p>
                </div>
                <div class="field">
                    <label class="label">Image</label>
                    <input   class="input" placeholder="File" name="file" type="file" />
                    <p class="help is-danger">${getError(
                        errors,
                        'file'
                    )}</p>
                </div>
                <button class="button is-primary">Create</button>
            </form>
        </div>
    </div>
</div>

    `
})
} 

