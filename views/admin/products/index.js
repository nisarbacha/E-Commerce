const layout = require('../layout');

module.exports = ({ products }) => {
    const renderProducts = products.map((product) => {
        return `
        <tr class="table-cell-text-align-center">
            <td>  ${product.title}  </td>
            <td> $ ${product.price}  </td>
            <td>
             <a class="button   is-success has-text-white" href="/admin/products/${product.id}/edit">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                     <path fill="currentColor" d="M21.04 12.13C21.18 12.13 21.31 12.19 21.42 12.3L22.7 13.58C22.92 13.79 22.92 14.14 22.7 14.35L21.7 15.35L19.65 13.3L20.65 12.3C20.76 12.19 20.9 12.13 21.04 12.13M19.07 13.88L21.12 15.93L15.06 22H13V19.94L19.07 13.88M11 19L9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1C13.3 1 14.4 1.84 14.82 3H19C20.1 3 21 3.9 21 5V9L19 11V5H17V7H7V5H5V19H11M12 3C11.45 3 11 3.45 11 4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4C13 3.45 12.55 3 12 3Z" />
                </svg>
                
             </a> 
              </td> 
              <td>
               <form method="POST" action="/admin/products/${product.id}/delete">
                <button class="button is-danger">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M4 19V7H16V19C16 20.1 15.1 21 14 21H6C4.9 21 4 20.1 4 19M6 9V19H14V9H6M13.5 4H17V6H3V4H6.5L7.5 3H12.5L13.5 4M19 17V15H21V17H19M19 13V7H21V13H19Z" />
                </svg>
               </button> 
               </form>
            </td>
        </tr>   
        `
    }).join('');
    return layout({
        content: ` 
    <section class="section is-max-desktop">
     <div class=" d-flex">
        <h1 class="productHeading">Product Title</h1> 
        <a href="/admin/products/new" class="button is-primary">
         <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M14.1,9L15,9.9L5.9,19H5V18.1L14.1,9M17.7,3C17.5,3 17.2,3.1 17,3.3L15.2,5.1L18.9,8.9L20.7,7C21.1,6.6 21.1,6 20.7,5.6L18.4,3.3C18.2,3.1 17.9,3 17.7,3M14.1,6.2L3,17.2V21H6.8L17.8,9.9L14.1,6.2M7,2V5H10V7H7V10H5V7H2V5H5V2H7Z" />
        </svg>
        Add Product</a> 
    </div>
       <table class="table is-hoverable">
        <thead class="notification is-primary has-text-white">
            <tr>
                <th class="has-text-white">Title</th>
                <th class="has-text-white">Price</th>
                <th class="has-text-white">Edit</th>
                <th class="has-text-white">Delete</th>
            </tr>
        </thead> 
        ${renderProducts}
      </table>
</section>  
    `
    })
}


