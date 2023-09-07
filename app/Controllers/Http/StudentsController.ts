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

  public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const studentId = params.id
      const student = await Student.findOrFail(studentId)

      const updatedData = request.only(['first_name', 'last_name', 'email', 'age'])
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
        return response.notFound({ error: 'Student not found' })
      }

      await student.delete()
      return response.ok({ message: 'Student was deleted' })
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred: ' + error.message })
    }
  }
}
