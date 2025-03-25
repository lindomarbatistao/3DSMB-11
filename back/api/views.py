from django.shortcuts import render
from .models import Professor, Subjects
from .serializers import ProfessorSerializer, SubjectSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import logout
from django.shortcuts import redirect

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_professores(request):
    if request.method == 'GET':
        queryset = Professor.objects.all()
        serializer = ProfessorSerializer(queryset, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ProfessorSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        else:
            return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)

class ProfessoresView(ListCreateAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

class ProfessoresDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Professor.objects.all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]

class SubjectsView(ListCreateAPIView):
    queryset = Subjects.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

class SubjectsDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Subjects.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [IsAuthenticated]

def logout_view(request):
    logout(request)
    return redirect('login') 


