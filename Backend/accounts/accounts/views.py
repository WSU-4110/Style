from django.http import JsonResponse

def save_customer_info(request):
    # Your logic for saving customer information
    return JsonResponse({"message": "Customer info saved"})

def save_business_info(request):
    # Your logic for saving business information
    return JsonResponse({"message": "Business info saved"})
