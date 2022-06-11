
// ----------------------------------------------------------------------------
// Get/Set HTML elements
// ----------------------------------------------------------------------------
const form = document.querySelector('#form_register')
const btn_submit = document.querySelector('#button_submit')
const btn_loading = document.querySelector('#button_loading')
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// From Controls
// ----------------------------------------------------------------------------
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const form_data = new FormData(form)

    btn_submit.style.display = 'none'
    btn_loading.style.display = 'block'

    const form_body_urlencoded = []
    for (const form_key of form_data.keys()) {
        const encoded_key = encodeURIComponent(form_key)
        const encoded_value = encodeURIComponent(form_data.get(form_key))
        form_body_urlencoded.push(encoded_key + "=" + encoded_value.trim())
    }

    try {
        const res = await add_member(form_body_urlencoded.join('&'))
        console.log(res)

        if (res.status === 200) {
            redirect_success()
        } else if (res.status === 406) {
            redirect_not_acceptable()
        } else {
            redirect_error()
        }
    } catch (err) {
        console.log(err)
        redirect_error()
    }
})
// ----------------------------------------------------------------------------
