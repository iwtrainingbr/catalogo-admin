function deleteStoreLead(id) {
  let removeStore = confirm('Deseja realmente excluir essa loja interessada?');

  if (removeStore === true) {
    fetch(API_URL + `store-leads/${id}.json`, {
      method: 'DELETE',
    });

    alert('Loja excluida com sucesso.');

    document.location.reload(true);
  }
}

function checkArray() {



    function listStoreLeads() {
      fetch(API_URL+'store-leads.json')
        .then(response => response.json())
        .then(response => {
          if (response.isArray(response) && response.length===0){
              document.getElementById("table-store-leads").innerHTML = `<div class="alert alert-danger"> Ainda não existem lojas interessadas </div>`;
              return;
            }

          for (let id in response) {
            let store = response[id];

            document.getElementById('tableStoreLeads').innerHTML += `
              <tr>
                <td>${store.name}</td>
                <td>${store.email}</td>
                <td>${store.phone}</td>
                <td>
                  <a href="#" onclick="deleteStoreLead('${id}')" class="btn btn-danger">Excluir</a>
                  <a href="?p=nova-loja&id=${id}" class="btn btn-success">Aprovar</a>
                </td>
              </tr>
            `;

        });

  return `
    ${navbar()}

    <div class="card card-body">
      <h1>Lojas interessadas</h1>
      <hr>
      <div id="table-store-leads">
      <table class="table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="tableStoreLeads"></tbody>
      </table>
      </div>
    </div>
  `;
}
