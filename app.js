const btnShowForm = document.getElementById('btn-show-form');
const btnCancelForm = document.getElementById('btn-cancel-form');
const sectionForm = document.getElementById('section-form');
const formCategorie = document.getElementById('form-categorie');
const tableBody = document.getElementById('table-categories-body');
const btnSubmit = document.getElementById('btn-submit');
const toast = document.getElementById('toast');

//  Menu Toggle
const sidebar = document.getElementById('sidebar');
const btnOpenSidebar = document.getElementById('btn-open-sidebar');
const btnCloseSidebar = document.getElementById('btn-close-sidebar');

if (btnOpenSidebar && btnCloseSidebar && sidebar) {
  btnOpenSidebar.addEventListener('click', () => sidebar.classList.remove('hidden'));
  btnCloseSidebar.addEventListener('click', () => sidebar.classList.add('hidden'));
}

// Toast 

const showToast = (message, isError = false) => {

    toast.textContent = message;
    toast.className = `fixed bottom-5 right-5 z-50 px-4 py-3 text-white transition-all ${isError ? 'bg-red-600' : 'bg-green-600'}`;
    setTimeout(() => toast.classList.add('hidden'), 3000);

}



btnShowForm.addEventListener('click', () => sectionForm.classList.toggle('hidden'));
btnCancelForm.addEventListener('click', () => sectionForm.classList.add('hidden'));

const loadProducts = async () => {
  tableBody.innerHTML = '<tr><td colspan="3" class="p-4 text-center text-gray-400">Loading...</td></tr>';
  try {
    const res = await fetch('api.php');
    const data = await res.json();
    
    if (Array.isArray(data) && data.length > 0) {
      tableBody.innerHTML = data.map(p => `
        <tr>
          <td class="p-4">${p.id}</td>
          <td class="p-4">${p.name}</td>
          <td class="p-4">
            <span>${p.price} $</span>
            <span class="ml-2 text-xs font-bold bg-blue-100 rounded p-2">Size: ${p.size}</span>
          </td>
        </tr>`).join('');
    } else {
      tableBody.innerHTML = '<tr><td colspan="3" class="p-4 text-center">No products found.</td></tr>';
    }
  } catch (error) {
    console.error('Error loading products:', error);
    showToast('Error loading products', true);
  }
};

formCategorie.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    name: document.getElementById('cat-nom').value,
    price: document.getElementById('cat-couleur').value,
    size: document.getElementById('cat-icone').value
  };

  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Saving...';

  try {
    
    await new Promise(resolve => setTimeout(resolve, 500));

    const res = await fetch('api.php', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload) 
    });
    const result = await res.json();
    
    if (res.ok && result.success) {
      formCategorie.reset();
      sectionForm.classList.add('hidden');
      showToast('Product added successfully!');
      loadProducts();
    } else {
      showToast(result.message || 'Error', true);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    showToast('Server error', true);
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Save';
  }
});

loadProducts();