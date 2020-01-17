import { FormGroup } from "@angular/forms";

export function validateRoundTrip(group: FormGroup): object {
    const from = group.get('from');
    const to = group.get('to');
 
    if (!from || !to) return null;
 
    if (from.value === to.value) {
        return { roundTrip: true };
    }
 
    return null;
 }
