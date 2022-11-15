const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ product, errors }) => {
    return layout({
        content: ` 
         <div class="container">
    <div class="columns is-centered">
        <div class="column is-half-desktop">
            <form method="POST" enctype="multipart/form-data">
                <h1 class="title">Edit Product</h1>
                <div class="field">
                    <label class="label">Title</label>
                    <input class="input" placeholder="Title" name="title"  value="${product.title}"/>
                    <p class="help is-danger">${getError(errors, 'title')}</p>
                </div>
                <div class="field">
                    <label class="label">Price</label>
                    <input   class="input" placeholder="Price" name="price" value="${product.price}"/>
                    <p class="help is-danger">${getError(errors, 'price')}</p>
                </div>
                <div class="field">
                    <label class="label">Image</label>
                    <input   class="input" placeholder="File" name="file" type="file" value="${product.file}"/>
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

