function filterCategories() {
  let expression = document.getElementById('searchCategories').value.toLowerCase();

  $('#tableCategory tr').filter(function () {
    $(this).toggle(
        $(this).text().toLowerCase().indexOf(expression) > -1
    )
  });
}

function editCategory(id, name, description, image) {
  document.getElementById('nameCategory').value = name;
  document.getElementById('descriptionCategory').value = description;
  document.getElementById('imageCategory').value = image;
  document.getElementById('category-id').value = id;

  $('#formCategoryEdit').fadeIn();
}

function confirmEditCategory() {
  event.preventDefault();

  let category = {
    name: document.getElementById('nameCategory').value,
    description: document.getElementById('descriptionCategory').value,
    image: document.getElementById('imageCategory').value,
  };

  let id = document.getElementById('category-id').value;

  fetch(API_URL + `/categories/${id}.json`, {
    method: 'PUT',
    body: JSON.stringify(category)
  });

  alert('Categoria editada com sucesso');
  document.location.reload(true);
}


function deleteCategoryFake(id) {

  document.getElementById('delete-fake-'+id).classList.add('d-none');
  document.getElementById('delete-'+id).classList.remove('d-none');
}

function cancelDelete(id) {
  document.getElementById('delete-fake-'+id).classList.remove('d-none');
  document.getElementById('delete-'+id).classList.add('d-none');
}

function deleteCategory(id) {
  fetch(API_URL + `categories/${id}.json`, {
    method: 'DELETE',
  })
  alert('Categoria excluida com sucesso.')

  document.location.reload(true)
}

function openImageModal(urlImage, categoryName) {
  document.getElementById('modalCategoryContent').innerHTML = `<img src="${urlImage}" width="100%">`;
  document.getElementById('modalCategoryTitle').innerHTML = categoryName;
  $('#modalCategoryImage').modal();
}

function cancelEditCategory() {
  $('#formCategoryEdit').fadeOut();
}

function listCategories() {

  fetch(API_URL + 'categories.json')
    .then(response => response.json())
    .then(response => {
      for (const id in response) {
        let category = response[id];

        document.getElementById('tableCategory').innerHTML += `
          <tr ondblclick="cancelDelete('${id}')">
            <td><img onclick="openImageModal('${category.image}', '${category.name}')" src=${category.image} width="100px"></td>
            <td>${category.name}</td>
            <td>${category.description}</td>
            <td>
              <button onclick="editCategory('${id}', '${category.name}', '${category.description}', '${category.image}')" class="btn btn-warning">Editar</button>
              <button class="btn btn-danger" id="delete-fake-${id}" onclick="deleteCategoryFake('${id}')">Excluir</button>
              <button class="btn btn-dark d-none" id="delete-${id}" onclick="deleteCategory('${id}')">Confirmar</button>
            </td>
          </tr>
        `
      }
    })

  return `
    ${navbar()}

    <!-- Modal Imagem -->
    <div class="modal fade" id="modalCategoryImage" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCategoryTitle"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="modalCategoryContent">
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
        </div>
      </div>
    </div>

    <section class="searchCategory">
      <h1 class="text-center">Consultar categoria</h1>
      <div class="mt-5">
        <div class="input-group justify-content-center">
          <div class="input-group-prepend">
            <span class="input-group-text material-icons">
              search
            </span>
          </div>
          <input type="text" onkeydown="filterCategories()" id="searchCategories" class="col-8 inputSearchCategory">
          <button class="btn btn-warning">Buscar</button>
        </div>
      </div>
    </section>

    <section class="card card-body mt-5" id="formCategoryEdit" style="display: none;">
      <h3>Editar Categoria</h3>
      <form onsubmit="confirmEditCategory()" action="#" method="post">
      
        <input type="hidden" id="category-id">
        <div class="form-group mt-5">
          <div class="form-row justify-content-center">
            <div class="form-group col-md-8">
              <input type="text" class="form-control" id="nameCategory" placeholder="Nome">
            </div>
          </div>
          <div class="form-row justify-content-center">
            <div class="form-group col-md-8">
              <textarea class="form-control" id="descriptionCategory" rows="5" placeholder="Descrição"></textarea>
            </div>
          </div>
          <div class="form-row justify-content-center">
            <div class="form-group col-md-8">
              <input type="text" class="form-control" id="imageCategory" placeholder="Insira a URL da imagem">
            </div>
          </div>
        </div>
        <div class="form-row justify-content-center mb-4">
          <button class="btn btn-warning btn-lg" id="liveToastBtn">Enviar</button>
          <br>
          <button class="btn btn-outline-secondary" type="button" onclick="cancelEditCategory()">Cancelar</button>
        </div>
      </form>
    </section>

    <section class="resultSearchCategory">
      <table class="table table-striped table-hover">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Imagem</th>
            <th scope="col">Nome</th>
            <th scope="col">Descrição</th>
            <th scope="col">Ação</th>
          </tr>
        </thead>
        <tbody id="tableCategory">
        </tbody>
      </table>
    </section>
    
    
  `
}
