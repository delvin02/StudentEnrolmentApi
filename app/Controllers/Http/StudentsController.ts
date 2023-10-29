import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'

export default class StudentsController {
  public async index({ response }: HttpContextContract) {
    try {
      const students = await Student.all()
      const formattedStudents = JSON.stringify(students, null, 2)
      return response.status(200).json(formattedStudents)
    } catch (error) {
      return response.status(500).json({ Message: 'An error occured ' + error.message })
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const studentData = request.only(['first_name', 'last_name', 'email', 'age'])

      // email check
      const existingStudent = await Student.findBy('email', studentData.email)
      if (existingStudent) {
        return response.status(400).json({ message: 'Student with this email alraedy exists' })
      }

      const student = await Student.create(studentData)

      return response.status(201).json(student)
    } catch (error) {
      return response.status(500).json({ Message: 'An error occured: ' + error.message })
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const studentId = params.id // Use params.id to get the student ID
      const student = await Student.find(studentId)

      if (!student) {
        return response.notFound({ error: 'Student not found' })
      }
      return response.json(JSON.stringify(student, null, 2))
    } catch (error) {
      return response.status(500).json({ Message: 'An error occurred: ' + error.message })
    }
  }

  public async edit({ params, request, response }: HttpContextContract) {
     try {
      const studentId = params.id
      const student = await Student.findOrFail(studentId)

      const updatedData = request.only(['first_name', 'last_name', 'email', 'age'])

      // check if any of the updated fields are blank
      if (
        updatedData.first_name === '' ||
        updatedData.last_name === '' ||
        updatedData.email === '' ||
        updatedData.age === ''
      ) {
        return response.status(400).json({ message: 'Updated fields cannot be blank' })
      }

      student.merge(updatedData)
      await student.save()

      return response.status(200).json(student)
    } catch (error) {
      return response.status(500).json({ Message: 'An error occurred: ' + error.message })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const studentId = params.id
      const student = await Student.findOrFail(studentId)

      const updatedData = request.only(['first_name', 'last_name', 'email', 'age'])

      // check if any of the updated fields are blank
      if (
        updatedData.first_name === '' ||
        updatedData.last_name === '' ||
        updatedData.email === '' ||
        updatedData.age === ''
      ) {
        return response.status(400).json({ message: 'Updated fields cannot be blank' })
      }

      student.merge(updatedData)
      await student.save()

      return response.status(200).json(student)
    } catch (error) {
      return response.status(500).json({ Message: 'An error occurred: ' + error.message })
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const studentId = params.id
      const student = await Student.find(studentId)

      if (!student) {
        return response.status(404).notFound({ error: 'Student not found' })
      }

      await student.delete()
      return response.ok({
        id: studentId,
        message: `Student ${studentId} deleted successfully`,
      })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred: ' + error.message })
    }
  }
}
