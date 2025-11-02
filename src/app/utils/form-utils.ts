import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2500);
  });
}
export class FormUtils {
  // Regular Expressions Patterns
  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static getMessageError(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido.';
        case 'minlength':
          return `Se requieren un mínimo de ${errors['minlength'].requiredLength} caracteres.`;
        case 'min':
          return `El valor mínimo es ${errors['min'].min}.`;

        case 'email':
          return `El valor ingresado no es un correo válido.`;
        
        case 'emailTaken':
          return `El correo electrónico ya está en uso.`;

        case 'notStraider':
          return `El nombre de usuario no puede ser utilizado por políticas de la empresa.`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === FormUtils.emailPattern) {
            return `El valor ingresado debe ser en formato de correo electrónico.`;
          }
          return `El valor ingresado tiene un formato inválido.`;

        default:
          return `Error de validación no controlado: ${key}`;
      }
    }
    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getMessageError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return this.getMessageError(errors);
  }

  static isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {
    return (formGroup: AbstractControl) => {
      const fieldOneValue = formGroup.get(fieldOne)?.value;
      const fieldTwoValue = formGroup.get(fieldTwo)?.value;

      return fieldOneValue === fieldTwoValue
        ? null
        : { passwordsNotMatch: true };
    };
  }

  static async checkingServerResponse(
    control: AbstractControl
  ): Promise<ValidationErrors | null> {
    console.log('Validando contra servidor...');

    await sleep();

    const formValue = control.value;

    if (formValue === 'hola@mundo.com') {
      return { 
        emailTaken: true 
      };
    }

    return null;
  }

  static notStraider(control: AbstractControl): ValidationErrors | null {

    const value = control.value;

    return value === 'strider' ? { notStraider: true } : null;

  }
}
