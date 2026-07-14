import { jsPDF } from 'jspdf';
import { Suggestion } from '../types';

/**
 * Generates and downloads a beautifully styled PDF report of the given nutrition plan.
 */
export const downloadNutritionPlanPDF = (plan: Suggestion) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - (margin * 2);

  let currentY = 20;

  // Helper to draw a horizontal separator line
  const drawSeparator = (y: number) => {
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
  };

  // Helper to add text with wrapping and handle page overflows
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    let currentLineY = y;
    
    for (let i = 0; i < lines.length; i++) {
      if (currentLineY > pageHeight - margin - 12) {
        doc.addPage();
        currentLineY = margin + 12;
        
        // Header on new pages
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(148, 163, 184); // slate-400
        doc.text('NutriAssist AI Nutrition Blueprint - Continued', margin, margin);
        drawSeparator(margin + 2);
        
        // Restore standard font for text rendering
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105); // slate-600
      }
      doc.text(lines[i], x, currentLineY);
      currentLineY += lineHeight;
    }
    return currentLineY;
  };

  // Header Accent Strip (Emerald Green)
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 0, pageWidth, 5, 'F');

  // Title Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('NutriAssist AI', margin, currentY);
  currentY += 8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text('BIOLOGICAL NUTRITION BLUEPRINT', margin, currentY);
  
  // Date on the right
  const dateStr = new Date(plan.date).toLocaleDateString();
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Generated: ${dateStr}`, pageWidth - margin - 45, currentY - 8);
  
  currentY += 8;
  drawSeparator(currentY);
  currentY += 10;

  // Clinical Profile Section
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text('CLINICAL PROFILE', margin, currentY);
  currentY += 6;

  // Background Box for profile metrics
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(241, 245, 249); // slate-100
  doc.roundedRect(margin, currentY, contentWidth, 26, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139); // slate-500
  
  // Profile metrics row 1
  doc.text('Subject Name:', margin + 6, currentY + 7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(plan.userName || 'Client', margin + 34, currentY + 7);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Goal:', margin + 95, currentY + 7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(16, 185, 129); // emerald-500
  doc.text(plan.weightGain || 'Maintain Weight', margin + 112, currentY + 7);

  // Profile metrics row 2
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Age:', margin + 6, currentY + 14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${plan.age} Yrs`, margin + 34, currentY + 14);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('BMI Score:', margin + 95, currentY + 14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${plan.bmi}`, margin + 112, currentY + 14);

  // Profile metrics row 3
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('Height / Weight:', margin + 6, currentY + 21);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(`${plan.height} cm / ${plan.weight} kg`, margin + 34, currentY + 21);

  currentY += 34;

  // Energy & Macros Targets
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('METABOLIC & MACRONUTRIENT TARGETS', margin, currentY);
  currentY += 5;

  // Bento Box background for macros (Dark theme matching design)
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, currentY, contentWidth, 22, 3, 3, 'F');

  // Energy
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text(`${plan.calorieIntake}`, margin + 8, currentY + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('DAILY KCAL TARGET', margin + 8, currentY + 15);

  // Protein
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(`${plan.proteinNeeds}g`, margin + 55, currentY + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('PROTEIN TARGET', margin + 55, currentY + 15);

  // Carbs
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(`${plan.carbohydrateNeeds}g`, margin + 100, currentY + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('CARBOHYDRATES', margin + 100, currentY + 15);

  // Fats
  const calculatedFats = Math.max(
    10,
    Math.round((plan.calorieIntake - plan.proteinNeeds * 4 - plan.carbohydrateNeeds * 4) / 9)
  );
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text(`${calculatedFats}g`, margin + 145, currentY + 9);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('HEALTHY FATS (EST.)', margin + 145, currentY + 15);

  currentY += 30;

  // Clinical Evaluation
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('CLINICAL EVALUATION & GUIDANCE', margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600

  // Render wrapped suggestion text
  currentY = addWrappedText(plan.suggestion, margin, currentY, contentWidth, 5);
  currentY += 8;

  // Recommended Foods
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('RECOMMENDED CLEAN FOODS', margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  
  if (plan.foods && plan.foods.length > 0) {
    plan.foods.forEach((food) => {
      currentY = addWrappedText(`• ${food}`, margin + 3, currentY, contentWidth - 3, 5);
    });
  } else {
    currentY = addWrappedText('No specific food recommendations listed.', margin, currentY, contentWidth, 5);
  }
  currentY += 8;

  // Meal Timings
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('MEAL SCHEDULING PROTOCOLS', margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  currentY = addWrappedText(plan.timing, margin, currentY, contentWidth, 5);
  currentY += 8;

  // Cardio & Activity Advice
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('CARDIO & PHYSICAL ACTIVITY GOALS', margin, currentY);
  currentY += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105);
  currentY = addWrappedText(plan.walk, margin, currentY, contentWidth, 5);

  // Footer Disclaimer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  const finalSeparatorY = Math.min(currentY + 12, pageHeight - margin - 8);
  drawSeparator(finalSeparatorY);
  
  const disclaimerText = 'Generated by NutriAssist AI Nutrition Advisor. This is an automated personalized biological guidance. Please consult with a healthcare professional before making drastic dietary or training changes.';
  addWrappedText(disclaimerText, margin, finalSeparatorY + 4, contentWidth, 4);

  // Save the PDF
  const safeUserName = plan.userName ? plan.userName.replace(/\s+/g, '_') : 'User';
  const filename = `NutriAssist_Plan_${safeUserName}_${dateStr.replace(/\//g, '-')}.pdf`;
  doc.save(filename);
};
