from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Customer, Business
from .serializers import CustomerSerializer, BusinessSerializer

@api_view(['GET', 'POST'])
def save_customer_info(request):
    if request.method == 'POST':
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Customer information saved successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "success": False,
                "message": "Failed to save customer information.",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == 'GET':
        email = request.query_params.get('email')
        customer = Customer.objects.filter(email=email).first()
        if customer:
            serializer = CustomerSerializer(customer)
            return Response(
                {
                    "success": True,
                    "message": "Customer information retrieved successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {
                "success": False,
                "message": "Customer not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET', 'POST'])
def save_business_info(request):
    if request.method == 'POST':
        serializer = BusinessSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Business information saved successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "success": False,
                "message": "Failed to save business information.",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == 'GET':
        name = request.query_params.get('name')
        business = Business.objects.filter(name=name).first()
        if business:
            serializer = BusinessSerializer(business)
            return Response(
                {
                    "success": True,
                    "message": "Business information retrieved successfully.",
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )
        return Response(
            {
                "success": False,
                "message": "Business not found."
            },
            status=status.HTTP_404_NOT_FOUND
        )
