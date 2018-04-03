function sweetAlert(titleToBind, bodyToBind, typeToBind) {
    swal({
        title: titleToBind,
        text: bodyToBind,
        type: typeToBind,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: false,
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        } else if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
        ) {
            swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })

}